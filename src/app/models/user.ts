export class User {

    constructor(private _nom?: String,
        private _prenom?: String,
        private _telephone?: String,
        private _email?: String,
        private _password?: String, private _status?: boolean) { }

    get nom() { return this._nom; }
    set nom(nom: String) { this._nom = nom }

    get prenom() { return this._prenom; }
    set prenom(prenom: String) { this._prenom = prenom }

    get telephone() { return this._telephone; }
    set telephone(telephone: String) { this._telephone = telephone }

    get email() { return this._email; }
    set email(email: String) { this._email = email }

    get password() { return this._password; }
    set password(password: String) { this._password = password }

    get status() { return this._status }
    set status(status: boolean) { this._status = status }
}