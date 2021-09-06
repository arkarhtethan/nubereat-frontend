module.exports = {
    client: {
        include: [
            "./src/**/*.{tsx,ts}"
        ],
        tagName: "gql",
        service: {
            name: "nuber-eats-backend",
            url: "http://localhost:3000/graphql"
        }
    }
};