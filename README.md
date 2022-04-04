# YCT-Image_Processing_Tasks
# Scope

This project works comprises the design and implementation of the selected task - Image Enhancement, Image Segmentation, Image Compression and Image Detection – on a Graphic enabled computer system.

# Definition of terms
Image processing: This is the use of a digital computer to process digital images through an algorithm.

Image: This is an optical or other representation of a real object; a graphic; or a picture.

Image detection: This is a computer technology that processes an image and detects objects in it.

Image segmentation: This is a method in which a digital image is broken into various image segments which helps in reducing the complexity of the image

Image enhancement: This is the process of improving the quality and information content of the original data before processing.

Image compression: This is a computer technology that is applied on digital images, to reduce their cost for storage and transmission.

# Models
Several models and dataset were used in the course of this project including a cloud based solution. In this project we made use of pre-trained model – MobileNet.

Image Segmentation - The Deeplab model.

Image Object Detection - Microsoft COCO. COCO (Common Objects in Context) provided in the cloud by Cloudinary.

Image Compression - JPEG mini. Image processing cloud service provided by Cloudinary.

Image Enhancement - Viesus. 

Cloudinary is a cloud-based service that provides an end-to-end image management solution including uploads, storage, manipulations, optimizations and delivery. 

# How to use.
The project is available and hosted on firebase as a web app via https://yctimagetasks.web.app/ at the moment.

Select Task

Firstly, the user chooses a task to perform from the list of selected image processing tasks available on the program.

Load

Secondly, the image is loaded into the program by using a file selector option. A validation is performed in order to ensure that image is valid. If validation     approves, the image is saved into a variable. The image is then displayed on the screen to assure to user the correct image is selected. Then, the dimensions of the image are computed including the rows, for processing. A waiter block is generated in order to inform the user it is been processed.

Process and analyze

The loaded image is then processed accordingly to the selected image processing task. This converts the image to Base64 data, performs the required algorithm for the selected task and return image data that is display on the screen to the user as the result of the operation.

# Tools

Angular JS

Capacitor JS

Ionic Framework

Bootstrap

Firebase

Electron

Cloudinary

