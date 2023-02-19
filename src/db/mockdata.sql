insert into jobs(job_title) values
('SARTAROSHXONA'),('GO''ZALLIK SALONI'),('ZARGARLIK USTAXONASI'),('SOATSOZ') returning *;

select * from worker;
select * from jobs;

insert into worker(worker_id, worker_name, worker_phone, worker_place,address,target,starts,ends,accept_id) values 
(
    969016216,
    'Ali Valiyev',
    '+998909534403',
    'Orasta',
    'Bektemir',
    'Bektemir tumani Buxoro Kafe yonida',
    '9:30',
    '18:00',
    969016216

);

-- UPDATE worker SET
-- worker_name = NULL OR worker_name
-- where worker_id = 969016216;