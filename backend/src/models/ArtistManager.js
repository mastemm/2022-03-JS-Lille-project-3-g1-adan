const AbstractManager = require("./AbstractManager");

class ArtistManager extends AbstractManager {
  static table = "artist";

  insert(artist) {
    return this.connection.query(
      `insert into ${ArtistManager.table} (firstname,lastname,phone,address,zipcode,city,nickname,avatar,banner,demo,description,role,cachet) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        artist.firstname,
        artist.lastname,
        artist.phone,
        artist.address,
        artist.zipcode,
        artist.city,
        artist.nickname,
        artist.avatar,
        artist.banner,
        artist.demo,
        artist.description,
        artist.role,
        artist.cachet,
      ]
    );
  }

  update(artist) {
    return this.connection.query(
      `update ${ArtistManager.table} set title = ? where id = ?`,
      [artist.title, artist.id]
    );
  }

  findAll() {
    return this.connection.query(`select role from  ${this.table}`);
  }

  // insert(item) {
  //   return this.connection.query(
  //     `insert into ${ArtistManager.table} (title) values (?)`,
  //     [item.title]
  //   );
  // }

  // update(item) {
  //   return this.connection.query(
  //     `update ${ItemManager.table} set title = ? where id = ?`,
  //     [item.title, item.id]
  //   );
  // }
}

module.exports = ArtistManager;
