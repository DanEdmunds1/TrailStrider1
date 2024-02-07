import axios from "axios"

// eslint-disable-next-line react/prop-types
export default function ImageUpload({ formData, setFormData }) {
    async function handleImageUpload(e) {
        const preset = import.meta.env.VITE_UPLOAD_PRESET
        const file = e.target.files[0]
        const endpoint = import.meta.env.VITE_UPLOAD_URL

        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', preset)

        try {
            const { data: { secure_url } } = await axios.post(endpoint, data)
            setFormData(prevFormData => ({
              ...prevFormData,
              image: secure_url
            }))
          
          } catch(error) {
            console.error('Error uploading image:', error)
          }
    }

    return (
        <>
    {formData.image ?
    <>
        <img src={formData.image} alt="Poster" style={{ maxWidth: "300px" }} />
        <input type="hidden" value={formData.image} name="image" />
    </>  
        :
        <input type="file" name="image" onChange={handleImageUpload} />
      }
    </>
    )
}