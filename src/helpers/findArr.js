export const findFromFavorites = (favorites, person) => favorites.find((favorite) => favorite.login.uuid === person.login.uuid);
