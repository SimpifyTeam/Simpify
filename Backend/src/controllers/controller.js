// Backend Home Endpoint
const Home = async (req, res) => {
    res.json(
        {
            title: "Simpify Backend",
            message: "All System is a go......",
            code: 200,
        }
    )
}

export {Home}