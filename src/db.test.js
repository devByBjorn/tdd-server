import { expect } from 'chai'
import { getUserByUsername } from './db'
import { getDatabaseData, setDatabaseData, resetDatabase } from './test-heplers'

describe('getUserByUsername', () => {
  afterEach('reset the database', async () => {
    await resetDatabase()
  })
  it('get the correct user from the database given a username', async () => {
    const fakeData = [{
      id: '123',
      username: 'abc',
      email: 'abc@gmail.com',
    }, {
      id: '124',
      username: 'wrong',
      email: 'wrong@wrong.com',
    }]

    await setDatabaseData('users', fakeData)

    const actual = await getUserByUsername('abc') // result of function 
    const finalDBState = await getDatabaseData('users')

    const expected = {
      id: '123',
      username: 'abc',
      email: 'abc@gmail.com',
    }

    expect(actual).excludingEvery('_id').to.deep.equal(expected) // exlude MongoDB unique id the testing
    expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData) // test that our getUserByUsername did not harm the db in any way. 
  })
})

/*
await db.collection('users').insertMany(fakeData) // inserting data to db
    const actual = await getUserByUsername('abc') // result of function
    const finalDBState = await db.collection('users').find().toArray() // get state of db
    await db.dropDatabase() // reset db so it does not affect our other tests
*/