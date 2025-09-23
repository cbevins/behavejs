<script>
    import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff'

    let fileInput // To bind the input element
    let fileContent = ''

    async function handleFileChange() {
        const file = fileInput.files[0] // Get the first selected file
        if (file) {
            // Method 1: Using FileReader API
            const reader = new FileReader()

            reader.onload = (event) => {
                console.log('Loaded file', file.name)
                fileContent = event.target.result // The content of the file
                // You can now process 'fileContent' (e.g., display it, parse JSON, etc.)
                // const tiff = await fromArrayBuffer(arrayBuffer);
            }

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            }
            
            // reader.readAsText(file) // Read the file as text (or use readAsDataURL, readAsArrayBuffer, etc.)
            reader.readAsArrayBuffer(file)

            // Method 2: Using the File object's text() method (for text files)
            // try {
            //   fileContent = await file.text();
            // } catch (error) {
            //   console.error('Error reading file:', error);
            // }
        } else {
            fileContent = '';
        }
    }
    </script>

<form class="max-w-lg mx-auto">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">
        Upload file</label>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" aria-describedby="user_avatar_help"
        id="user_avatar" type="file" bind:this={fileInput} on:change={handleFileChange} />
    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
        Select a file</div>
</form>

{#if fileContent}
    <h3>File Content:</h3>
    <pre>{fileContent}</pre>
{/if}
