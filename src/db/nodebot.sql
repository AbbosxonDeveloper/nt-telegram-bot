CREATE DATABASE node-bot;

CREATE extension "uuid-ossp";

CREATE TABLE IF NOT EXISTS worker (
    worker_id varchar unique,
    worker_name varchar,
    worker_phone varchar(99),
    worker_place varchar(40),
    address varchar(118),
    target varchar(125),
    starts varchar(10),
    ends varchar(10),
    accept_id varchar unique
);

CREATE TABLE IF NOT EXISTS jobs (
    job_id uuid default uuid_generate_v4() PRIMARY KEY,
    job_title varchar(45)
);

CREATE TABLE IF NOT EXISTS users (
    user_id int,
    user_name varchar
);
