import validator from 'validator'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = makeSut()
    const isValid = sut.isValid('invalid_email')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const sut = makeSut()
    const isValid = sut.isValid('valid_email')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct e-mail', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const sut = makeSut()
    sut.isValid('any_email')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
