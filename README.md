# Image processing

- This project was created to perform the follwing tasks.
- Adding a picture file from local storage.
- Making some changes on brightness, contrast,saturation and gamma on the image.
- Apply or cancel the desired settings.
- Uploading the edited picture to the database.

# Requirements

Front-end (UI Designing)

- "@material-ui/core"
- "@material-ui/icons"
- "@material-ui/lab"
- "react"
- "react-dom"
- "react-dropzone"

  Back-end (Uploading images)

- "body-parser"
- "cors"
- "express"
- "mongodb"
- "morgan"

# Explanation

- Once the desired setting has been made to the images, it will saved in mongoDB's database named 'imgprocess' inside the collection named 'images'.
