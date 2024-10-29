const handleDownload = async (imageSrc: string) => {
    try {
        // Fetch the image as a blob
        const response = await fetch(imageSrc, {
            mode: 'cors', // Ensures CORS headers are respected
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Image download failed');
        }

        // Convert response to blob
        const blob = await response.blob();
        
        // Create a temporary URL for the blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `image-${Date.now()}.jpg`; // Customize the filename

        // Programmatically click the link to start download
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link and revoking the blob URL
        link.remove();
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download failed:', error);
    }
};
