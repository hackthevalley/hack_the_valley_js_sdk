// @flow
export default class FileController {
    /**
     * Takes in a File object from browser, convert it to base64.
     * This function only works if you are running this in a browser.
     */
    getBase64FromFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload  = () => resolve(reader.result.toString());
            reader.onerror = e => reject(e);
        })
    }

    /**
     * Get file type from a base64 string converted by getBase64FromFile.
     * Must start with data:???/???;
     */
    getFileTypeFromBase64(base64: string): string {
        return base64.split(";")[0].split(":")[1].split("/")[1];
    }
}
