export const REGISTERWORKER = `
    INSERT INTO worker(worker_id, worker_name, worker_phone, worker_place, address,target,starts,ends) VALUES
    ($1, $2 ,$3 , $4, $5, $6,$7,$8)
`

export const ADDWORKERID = `
    INSERT INTO worker(worker_id) VALUES
    ($1)
`

export const CANCEL_WORKER = `
    delete from worker where 
    worker_id = $1
`

export const EXISTINGWORKERID = `
    SELECT * FROM worker WHERE
    worker_id = $1
`

export const EXISTINGWORKER = `
    SELECT * FROM worker WHERE
    accept_id = $1
`