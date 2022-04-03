import { DbAddAccount } from './DbAddAccount'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypt with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await Promise.resolve('hashed_password')
      }
    }

    const encrypterStub = new EncrypterStub()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const sut = new DbAddAccount(encrypterStub)
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
