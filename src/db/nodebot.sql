CREATE DATABASE node-bot;

CREATE extension "uuid-ossp"

CREATE TABLE worker(
    worker_id int,
    worker_name varchar,
    worker_phone varchar(99),
    worker_place varchar(40),
    address varchar(118),
    target varchar(125),
    start varchar(10),
    end varchar(10)
);

CREATE TABLE jobs (
    job_id uuid default uuid_generate_v4() PRIMARY KEY,
    job_title varchar(45)
);

CREATE TABLE users(
    user_id int,
    user_name varchar,
);