const router=require('express').Router();

router.use(express.static('public'))

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '../public/login.html')
})

router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '../public/signup.html')
})

router.get('/showData', (req, res) => {
    res.sendFile(__dirname + '../public/showData.html')
})

module.exports=router;