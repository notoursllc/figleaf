export default function useFile() {

    /**
     * Checks to see if every File in FileList is of the accepted file type
     *
     * @param {*} FileList
     * @param {*} accept - array of accepted file types, e.g. ['image/png', 'image/jpeg', 'image/gif']
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/FileList
     * @returns boolean
     */
    function filesAreAcceptedType(FileList, accept) {
        if (!Array.isArray(accept)) {
            accept = accept?.split(',').map((type) => type.trim());
        }

        if (!accept.length) {
            return true;
        }

        const acceptedTypes = accept.map((type) => type.trim());
        let isAcceptedType = true;

        for (let i=0; i<FileList.length; i++) {
            if (!acceptedTypes.includes(FileList[i].type)) {
                isAcceptedType = false;
            }
        }

        return isAcceptedType;
    }

    return {
        filesAreAcceptedType
    }

}
