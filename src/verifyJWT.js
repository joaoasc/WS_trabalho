
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token,SECRET, (err, decoded)=>{
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        req.userClass = decoded.userClass;
        next() 
    }); 
}