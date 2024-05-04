
const API_KEY = process.env.REACT_APP_MOVIESDB_API_KEY;
const API_READ_AT = process.env.REACT_APP_MOVIESDB_API_KEY;

test('Can connect to MoviesAPI', () => {
    expect(API_KEY).not.toBeNull;
    expect(API_READ_AT).not.toBeNull;
});