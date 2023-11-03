module.exports = {
    statSync: jest.fn((file)=>{
        return {
            size: 12
        }
    }),
    readFileSync: jest.fn((file)=>{
    })
}