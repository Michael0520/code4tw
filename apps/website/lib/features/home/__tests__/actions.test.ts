import { describe, it, expect } from 'vitest'
import { getHomeData } from '../actions'

describe('Home Page Actions', () => {
  it('should return home data with correct structure', async () => {
    const data = await getHomeData()

    expect(data).toBeDefined()
    expect(typeof data).toBe('object')
    expect(data).toHaveProperty('aboutFeatures')
    expect(data).toHaveProperty('communityRoles')
  })

  it('should return about features as an array', async () => {
    const data = await getHomeData()

    expect(Array.isArray(data.aboutFeatures)).toBe(true)
  })

  it('should return community roles as an array', async () => {
    const data = await getHomeData()

    expect(Array.isArray(data.communityRoles)).toBe(true)
  })

  it('should return data synchronously', async () => {
    const start = Date.now()
    await getHomeData()
    const end = Date.now()

    // Should be very fast since it's static data
    expect(end - start).toBeLessThan(100)
  })

  it('should return consistent data across multiple calls', async () => {
    const data1 = await getHomeData()
    const data2 = await getHomeData()

    expect(data1).toEqual(data2)
  })
})