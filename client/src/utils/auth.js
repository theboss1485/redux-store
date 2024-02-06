import decode from 'jwt-decode';

class AuthService {

    // This function gets the current profile.
    getProfile() {

        return decode(this.getToken());
    }

    // This function checks if there is a saved token (that is, a logged in user) and also if the token is still valid.
    loggedIn() {

        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // This function checks if the current token is expired.
    isTokenExpired(token) {

        try {

            const decoded = decode(token);

            if (decoded.exp < Date.now() / 1000) {

                return true;

            } else return false;

        } catch (err) {

            return false;
        }
    }

    // This function retrieves the user's current token from localStorage
    getToken() {

        
        return localStorage.getItem('id_token');
    }

    //This function saves the user's token to localStorage and takes the user to the home page.
    login(idToken) {

        
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        
        // This will clear the user token and profile data from localStorage.
        localStorage.removeItem('id_token');
        
        // This will reload the page and reset the state of the application.
        window.location.assign('/');
    }
}

export default new AuthService();
