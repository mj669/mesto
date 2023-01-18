class UserInfo {
    constructor(nameProfile, jobeProfile) {
        this._nameProfile = nameProfile;
        this._jobeProfile = jobeProfile;
    }

    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            job: this._jobeProfile.textContent,
        }
    }

    setUserInfo({name, job}) {
        this._nameProfile.textContent = name;
        this._jobeProfile.textContent = job;
    }
}
export default UserInfo;