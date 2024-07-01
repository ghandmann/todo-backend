let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// Clear the inMemoryStore before each test run
beforeEach(() => app.inMemoryStore = []);

describe("GET /todo-item/", () => {
    it("should return empty array on empty store", async () => {
        const res = await chai.request(app).get("/todo-items/");

        res.should.have.status(200);

        res.body.should.be.an('array');
        res.body.should.be.empty;
    });

    it("should return todo-items from store", async () => {
        // Inject todo-items into the in memory store of the app
        app.inMemoryStore = [
            { "text": "dummy todo item 1", "id": "abc" },
            { "text": "dummy todo item 2", "id": "xyz" }
        ];

        const res = await chai.request(app).get("/todo-items/");

        res.should.have.status(200);

        res.body.should.be.an('array');
        res.body.should.have.length(2);
    });
});

describe("POST /todo-items/", () => {
    it("should add item to the in memory store", async () => {
        var res = await chai.request(app).post("/todo-items/").send({ "text": "my new todo item", "id": "4711" });

        res.should.have.status(200);
        app.inMemoryStore.should.have.length(1);

        app.inMemoryStore[0].text.should.equal("my new todo item");
        app.inMemoryStore[0].id.should.equal("4711");
    });
});

describe("DELETE /todo-items/:id", () => {
    // Make sure there is an entry in the store
    beforeEach(() => app.inMemoryStore = [{ "text": "delete me", "id": "4711" }]);

    it("should delete todo-item with matching id", async () => {
        var res = await chai.request(app).del("/todo-items/4711");

        res.should.have.status(200);

        app.inMemoryStore.should.be.empty;
    });

    it("should delete nothing with wron id", async () => {
        var res = await chai.request(app).del("/todo-items/some-unkown-id");

        res.should.have.status(200);

        app.inMemoryStore.should.have.length(1);
    });

});

describe("GET /delete-all/", () => {
    it("should delete all entries", async () => {

        app.inMemoryStore = [ 1, 2, 3, 4 ];

        let res = await chai.request(app).get("/delete-all/");

        res.should.have.status(200);

        app.inMemoryStore.should.be.empty;
    });
});

describe("GET /divide/", () => {
    it("should return bad request on division by zero", async () => {
        let res = await chai.request(app).get("/divide/10/0");

        res.should.have.status(400);
    });

    it("should do the math", async () => {
        let res = await chai.request(app).get("/divide/10/5");

        res.should.have.status(200);
        res.text.should.be.a("string");
        res.text.should.equal('2');
    });
})