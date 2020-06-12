const axios = require('./axios').instance;

export default {
    async retreiveAssets() {
        return await axios.get(`/assets`, {
			headers: {
				'x-access-token': localStorage.getItem("token")
			}
		})
		.catch((error) => {
			throw error
		})
    }
}