export class Todo {
    constructor(private _titre?: String, private _description?: String, private _idUser?: String, private _dateAjout?: Date, private _dateFin?: Date, private _etat?: Boolean) { }

    get titre() { return this._titre; };
    set titre(titre: String) { this._titre = titre; }

    get description() { return this._description }
    set description(desc: String) { this._description = desc }

    get idUser() { return this._idUser }
    set idUser(id: String) { this._idUser = id }

    get dateAjout() { return this._dateAjout }
    set dateAjout(dateajout: Date) { this._dateAjout = dateajout }

    get dateFin() { return this._dateFin }
    set dateFin(datefin: Date) { this._dateFin = datefin }

    get etat() { return this._etat }
    set etat(etat: Boolean) { this._etat = etat }

}