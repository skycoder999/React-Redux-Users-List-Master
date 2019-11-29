import faker from "faker";
/**
 * Get a Random List of users
 * @returns {Array}
 */
export function getUsers() {
    const users = [];
    for (let i = 0; i < 100; i++) {
        users.push({
            id: faker.random.number(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            image: faker.image.avatar(),
            bitcoinAddress: faker.finance.bitcoinAddress()
        });
    }
    return users;
}
