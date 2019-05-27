import * as productHelper from '../product-helpers'

describe('Test suite for product-helper', () => {
  test('getAvailableSize should return correct value', () => {
    const input = [
      {
        color: 'Yellow',
        quantity: 0,
        size: '1-2 tahun',
      },
      {
        color: 'Grey',
        quantity: 6,
        size: '1-2 tahun',
      },
      {
        color: 'Blue',
        quantity: 4,
        size: '0-6 bulan',
      },
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
    ]
    const expected = ['1-2 tahun', '0-6 bulan', '2-3 tahun']
    const result = productHelper.getAvailableSize(input)
    expect(result).toEqual(expected)
  })

  test('getAvailableColor should return correct value', () => {
    const input = [
      {
        color: 'Yellow',
        quantity: 0,
        size: '1-2 tahun',
      },
      {
        color: 'Grey',
        quantity: 6,
        size: '1-2 tahun',
      },
      {
        color: 'Blue',
        quantity: 4,
        size: '0-6 bulan',
      },
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
    ]
    const expected = ['Grey', 'Blue', 'Red']
    const result = productHelper.getAvailableColor(input)
    expect(result).toEqual(expected)
  })

  test('filterVariantsByColorAndSize should return correct value', () => {
    const input = [
      {
        color: 'Grey',
        quantity: 6,
        size: '1-2 tahun',
      },
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
      {
        color: 'Red',
        quantity: 6,
        size: '0-6 tahun',
      },
      {
        color: 'Green',
        quantity: 10,
        size: '2-3 tahun',
      },
    ]
    const expected1 = [
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
      {
        color: 'Green',
        quantity: 10,
        size: '2-3 tahun',
      },
    ]
    const expected2 = [
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
      {
        color: 'Red',
        quantity: 6,
        size: '0-6 tahun',
      },
    ]
    const result1 = productHelper.filterVariantsByColorAndSize(
      input,
      null,
      '2-3 tahun'
    )

    const result2 = productHelper.filterVariantsByColorAndSize(
      input,
      'Red',
      null
    )
    expect(result1).toEqual(expected1)
    expect(result2).toEqual(expected2)
  })

  test('getVariantsAvailabilityMapByType should return correct value', () => {
    const input1 = [
      {
        color: 'Red',
        quantity: 6,
        size: '2-3 tahun',
      },
      {
        color: 'Green',
        quantity: 10,
        size: '2-3 tahun',
      },
    ]

    const input2 = [
      {
        color: 'Grey',
        quantity: 6,
        size: '1-2 tahun',
      },
      {
        color: 'Grey',
        quantity: 6,
        size: '2-3 tahun',
      },
      {
        color: 'Grey',
        quantity: 0,
        size: '0-6 tahun',
      },
    ]

    const expected1 = {
      Red: true,
      Green: true,
    }

    const expected2 = {
      '1-2 tahun': true,
      '2-3 tahun': true,
    }

    const result1 = productHelper.getVariantsAvailabilityMapByType(
      input1,
      'color'
    )
    const result2 = productHelper.getVariantsAvailabilityMapByType(
      input2,
      'size'
    )
    expect(result1).toEqual(expected1)
    expect(result2).toEqual(expected2)
  })
})
