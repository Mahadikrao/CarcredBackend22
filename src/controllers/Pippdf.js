import path from "path";
import fs from "fs";
const PDF_DIRECTORY = "D:/SourceCode/CarCredBackend/outputs";



export const downloadPDF = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const filePath = path.join(PDF_DIRECTORY, fileName);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("File download error:", err);
                res.status(500).json({ message: "Error downloading the file" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
