#!/usr/bin/env python3
"""
Real-Time Object Detection & Tracking with YOLOv8 + Deep SORT
Author: Computer Vision Engineer
Dependencies: pip install ultralytics deep-sort-realtime opencv-python
"""

import cv2
import numpy as np
import time
from ultralytics import YOLO
from deep_sort_realtime.deepsort_tracker import DeepSort

class ObjectDetectionTracker:
    def __init__(self, model_path="yolov8n.pt", conf_threshold=0.5):
        """
        Initialize the Object Detection & Tracking system
        
        Args:
            model_path: Path to YOLOv8 model (yolov8n.pt, yolov8s.pt, yolov8m.pt, yolov8l.pt, yolov8x.pt)
            conf_threshold: Confidence threshold for detections
        """
        # Initialize YOLOv8 detector
        self.detector = YOLO(model_path)
        self.conf_threshold = conf_threshold
        
        # Initialize Deep SORT tracker
        self.tracker = DeepSort(
            max_age=30,          # Maximum number of frames to keep track alive
            n_init=3,            # Number of consecutive detections to confirm track
            nms_max_overlap=1.0, # Non-maximum suppression threshold
            max_cosine_distance=0.4  # Maximum cosine distance for appearance matching
        )
        
        # Color palette for visualization
        self.colors = np.random.randint(0, 255, size=(100, 3), dtype=np.uint8)
        
        # Performance metrics
        self.fps_counter = 0
        self.start_time = time.time()
        
    def detect_objects(self, frame):
        """
        Detect objects in frame using YOLOv8
        
        Args:
            frame: Input video frame
            
        Returns:
            List of detections in format: [[x, y, w, h], confidence, class_id]
        """
        results = self.detector(frame, conf=self.conf_threshold, verbose=False)
        detections = []
        
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    # Extract bounding box coordinates
                    x1, y1, x2, y2 = box.xyxy.cpu().numpy()
                    w, h = x2 - x1, y2 - y1
                    
                    # Extract confidence and class
                    confidence = box.conf.cpu().numpy()
                    class_id = int(box.cls.cpu().numpy())
                    
                    # Format for Deep SORT: [x, y, w, h], confidence, class_id
                    detections.append([[x1, y1, w, h], confidence, class_id])
                    
        return detections
    
    def track_objects(self, detections, frame):
        """
        Track detected objects using Deep SORT
        
        Args:
            detections: List of detections from YOLOv8
            frame: Current video frame
            
        Returns:
            List of active tracks
        """
        tracks = self.tracker.update_tracks(detections, frame=frame)
        return tracks
    
    def visualize_results(self, frame, tracks):
        """
        Draw bounding boxes, IDs, and labels on frame
        
        Args:
            frame: Input frame
            tracks: Active tracks from Deep SORT
            
        Returns:
            Annotated frame
        """
        height, width = frame.shape[:2]
        
        for track in tracks:
            if not track.is_confirmed():
                continue
                
            # Get track information
            track_id = track.track_id
            x1, y1, x2, y2 = track.to_ltrb()
            class_id = track.get_det_class()
            
            # Ensure coordinates are within frame bounds
            x1, y1 = max(0, int(x1)), max(0, int(y1))
            x2, y2 = min(width, int(x2)), min(height, int(y2))
            
            # Get color for this track
            color = tuple(map(int, self.colors[track_id % len(self.colors)]))
            
            # Draw bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            
            # Draw track ID and class label
            label = f"ID: {track_id}"
            if class_id is not None:
                class_name = self.detector.names.get(class_id, f"Class_{class_id}")
                label += f" | {class_name}"
                
            # Calculate label position
            label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
            label_y = y1 - 10 if y1 - 10 > label_size[1] else y1 + label_size[1] + 10
            
            # Draw label background
            cv2.rectangle(frame, 
                         (x1, label_y - label_size[1] - 5),
                         (x1 + label_size + 5, label_y + 5),
                         color, -1)
            
            # Draw label text
            cv2.putText(frame, label, (x1 + 2, label_y),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            
            # Draw track trajectory (optional)
            if hasattr(track, 'centroid_history'):
                for i in range(1, len(track.centroid_history)):
                    cv2.line(frame, 
                           tuple(map(int, track.centroid_history[i-1])),
                           tuple(map(int, track.centroid_history[i])),
                           color, 2)
        
        return frame
    
    def calculate_fps(self):
        """Calculate and return current FPS"""
        self.fps_counter += 1
        elapsed_time = time.time() - self.start_time
        
        if elapsed_time >= 1.0:
            fps = self.fps_counter / elapsed_time
            self.fps_counter = 0
            self.start_time = time.time()
            return fps
        return 0
    
    def run_tracking(self, source=0, output_path=None):
        """
        Main tracking loop
        
        Args:
            source: Video source (0 for webcam, path for video file)
            output_path: Optional path to save output video
        """
        # Initialize video capture
        cap = cv2.VideoCapture(source)
        
        if not cap.isOpened():
            print(f"Error: Could not open video source {source}")
            return
        
        # Get video properties
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        original_fps = cap.get(cv2.CAP_PROP_FPS)
        
        # Initialize video writer if output path is specified
        writer = None
        if output_path:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            writer = cv2.VideoWriter(output_path, fourcc, 20.0, (width, height))
        
        print("Starting Object Detection & Tracking...")
        print("Press 'q' to quit, 's' to save screenshot")
        
        frame_count = 0
        
        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    print("End of video stream or failed to read frame")
                    break
                
                frame_count += 1
                
                # Detect objects in current frame
                detections = self.detect_objects(frame)
                
                # Track detected objects
                tracks = self.track_objects(detections, frame)
                
                # Visualize results
                annotated_frame = self.visualize_results(frame, tracks)
                
                # Calculate and display FPS
                fps = self.calculate_fps()
                if fps > 0:
                    cv2.putText(annotated_frame, f"FPS: {fps:.1f}", (10, 30),
                               cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                
                # Display object count
                active_tracks = len([t for t in tracks if t.is_confirmed()])
                cv2.putText(annotated_frame, f"Objects: {active_tracks}", (10, 70),
                           cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                
                # Display frame
                cv2.imshow('Object Detection & Tracking', annotated_frame)
                
                # Save frame if output path is specified
                if writer:
                    writer.write(annotated_frame)
                
                # Handle key presses
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    break
                elif key == ord('s'):
                    screenshot_path = f"screenshot_{frame_count}.jpg"
                    cv2.imwrite(screenshot_path, annotated_frame)
                    print(f"Screenshot saved: {screenshot_path}")
                    
        except KeyboardInterrupt:
            print("\nTracking interrupted by user")
            
        finally:
            # Cleanup
            cap.release()
            if writer:
                writer.release()
            cv2.destroyAllWindows()
            print("Tracking completed!")

def main():
    """Main function to run the tracking system"""
    
    # Initialize tracker with YOLOv8 nano model (fastest)
    # Options: yolov8n.pt (nano), yolov8s.pt (small), yolov8m.pt (medium), 
    #          yolov8l.pt (large), yolov8x.pt (extra-large)
    tracker = ObjectDetectionTracker(
        model_path="yolov8n.pt",    # Will download automatically if not found
        conf_threshold=0.5          # Adjust confidence threshold as needed
    )
    
    # Run tracking on webcam (source=0) or video file (source="path/to/video.mp4")
    tracker.run_tracking(
        source=0,                   # Webcam
        # source="input_video.mp4", # Uncomment for video file
        # output_path="output_tracked.mp4"  # Uncomment to save output
    )

if __name__ == "__main__":
    main()


