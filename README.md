# kurebiad

kurebiad is a desktop manga reader application designed to allow you to enjoy locally stored manga chapters with a user-friendly interface. Built using Electron, JavaScript, HTML, and CSS, kurebiad supports structured manga directories and provides smooth chapter navigation.


## Features
- **Local Manga Loading**: Add manga stored on your device with a single click.
- **Organized Chapters**: Automatically detects chapters and sorts them for easy navigation.
- **Customizable UI**: Sleek design with Inter font and harmonious colors for an enjoyable reading experience.
- **Multiple Formats**: Supports `.webp` images for manga pages.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kubilaiswf/kurebiad
   cd kurebiad
   ```

2. **Install Dependencies**
   Make sure [Node.js](https://nodejs.org/) is installed, then run:
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm start
   ```

## Usage

1. **Launch kurebiad**: Run `npm start` in the terminal.
2. **Add a Manga**:
   - Click the `+` icon on the left to add a new manga.
   - Provide a manga name, select the manga folder (organized as described below), and optionally upload a cover image.
3. **Navigate Chapters and Pages**:
   - Click on a manga in the list to view chapters.
   - Select any chapter to start reading.

## Directory Structure

To use kurebiad effectively, organize your manga directory as follows:
```
Manga_Name/
├── 1/                  # Chapter 1 folder
│   ├── page1.webp      # Page 1 of Chapter 1
│   ├── page2.webp
│   └── ...
├── 2/                  # Chapter 2 folder
│   ├── page1.webp      # Page 1 of Chapter 2
│   └── ...
└── ...
```
Each chapter folder (e.g., `1`, `2`, ...) holds `.webp` images, which represent pages of the chapter.

## Technologies

- **Electron**: For building a cross-platform desktop application.
- **JavaScript, HTML, CSS**: Core languages for structure, style, and interactivity.
- **Node.js**: For managing file system access and dependencies.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request for review.

## License

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. You may obtain a copy of the License at:

[Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
