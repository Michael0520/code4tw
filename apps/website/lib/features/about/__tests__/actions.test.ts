import { describe, it, expect } from 'vitest'
import {
  getAboutInformation,
  getOrganization,
  getPrinciples,
  getCoreValues,
  getActiveTeamMembers,
  getOrganizationStats
} from '../actions'

describe('About Page Actions', () => {
  it('should return complete about information with correct structure', async () => {
    const data = await getAboutInformation()

    expect(data).toBeDefined()
    expect(typeof data).toBe('object')
    expect(data.organization).toBeDefined()
    expect(data.principles).toBeDefined()
    expect(data.values).toBeDefined()
    expect(data.team).toBeDefined()
    expect(data.stats).toBeDefined()
  })

  it('should return organization with required fields', async () => {
    const organization = await getOrganization()

    expect(organization.name).toBeDefined()
    expect(organization.tagline).toBeDefined()
    expect(organization.foundedYear).toBeDefined()
    expect(organization.age).toBeDefined()
    expect(organization.mission).toBeDefined()
    expect(organization.vision).toBeDefined()
  })

  it('should return principles as an array', async () => {
    const principles = await getPrinciples()

    expect(Array.isArray(principles)).toBe(true)
    expect(principles.length).toBeGreaterThan(0)
  })

  it('should return values as an array', async () => {
    const values = await getCoreValues()

    expect(Array.isArray(values)).toBe(true)
    expect(values.length).toBeGreaterThan(0)
  })

  it('should return active team members', async () => {
    const team = await getActiveTeamMembers()

    expect(Array.isArray(team)).toBe(true)
  })

  it('should calculate organization age correctly', async () => {
    const organization = await getOrganization()
    const currentYear = new Date().getFullYear()
    const expectedAge = currentYear - organization.foundedYear

    expect(organization.age).toBe(expectedAge)
  })

  it('should return organization stats', async () => {
    const stats = await getOrganizationStats()

    expect(stats).toBeDefined()
    expect(typeof stats.foundedYear).toBe('number')
    expect(typeof stats.age).toBe('number')
  })
})