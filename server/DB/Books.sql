CREATE TABLE Books (
    id serial PRIMARY KEY,
    title VARCHAR (250),
    author VARCHAR (250),
    checked_OUT BOOLEAN,
    checked_out_by integer,
    checked_out_on TIMESTAMP,
    returned TIMESTAMP
)