class UserInfo {
    constructor({ nameSelector, jobSelector, id, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._id = id;
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
            id: this._id,
        }
    }

    setUserInfo({ name, job, id, }) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._id = id;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar
    }
}
export default UserInfo;