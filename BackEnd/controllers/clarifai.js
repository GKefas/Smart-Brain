
const ClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.PAT;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = process.env.USER_ID;
    const APP_ID = process.env.APP_ID;
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imageUrl;
    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Key " + PAT,
        },
        body: raw,
    };

    return requestOptions;
};



const GetBountires = (req, res) => {
    const { url } = req.body;
    fetch(
        "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
        ClarifaiRequestOptions(url)
    )
        .then(response => response.json())
        .then(result => res.json(result))
        .catch(() => res.status(400).json('Unable to get clarifai access'))
}

export default GetBountires;