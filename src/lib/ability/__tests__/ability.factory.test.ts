import { defineAbilityFor } from '../ability.factory'
import { Action } from '@/types/common'
import { Role } from '@/types/user'

// Simple test runner function for CASL abilities
function test(description: string, testFn: () => void) {
    try {
        testFn()
        console.log(`✅ ${description}`)
    } catch (error) {
        console.log(`❌ ${description}: ${error}`)
    }
}

function expect(value: any) {
    return {
        toBe: (expected: any) => {
            if (value !== expected) {
                throw new Error(`Expected ${expected} but got ${value}`)
            }
        },
        toBeTruthy: () => {
            if (!value) {
                throw new Error(`Expected truthy but got ${value}`)
            }
        },
        toBeFalsy: () => {
            if (value) {
                throw new Error(`Expected falsy but got ${value}`)
            }
        }
    }
}

// Test data
const adminUser = { id: 1, roles: ['admin'] as Role[] }
const salesUser = { id: 2, roles: ['sales'] as Role[] }
const supportUser = { id: 3, roles: ['support'] as Role[] }
const financeUser = { id: 4, roles: ['finance'] as Role[] }
const mortgageUser = { id: 5, roles: ['mortgage_operator'] as Role[] }
const displayUser = { id: 6, roles: ['user'] as Role[] }
const guestUser = { id: 0, roles: [] as Role[] }

console.log('🧪 Running CASL Ability Factory Unit Tests...\n')

// Admin tests
console.log('👑 Admin User Tests:')
const adminAbility = defineAbilityFor(adminUser)
test('Admin can manage all', () => expect(adminAbility.can(Action.Manage, 'all')).toBeTruthy())
test('Admin can create property', () => expect(adminAbility.can(Action.Create, 'Property')).toBeTruthy())
test('Admin can update property', () => expect(adminAbility.can(Action.Update, 'Property')).toBeTruthy())
test('Admin can delete property', () => expect(adminAbility.can(Action.Delete, 'Property')).toBeTruthy())

// Sales tests
console.log('\n💼 Sales User Tests:')
const salesAbility = defineAbilityFor(salesUser)
test('Sales can read property', () => expect(salesAbility.can(Action.Read, 'Property')).toBeTruthy())
test('Sales can create property', () => expect(salesAbility.can(Action.Create, 'Property')).toBeTruthy())
test('Sales can update property', () => expect(salesAbility.can(Action.Update, 'Property')).toBeTruthy())
test('Sales cannot manage all', () => expect(salesAbility.can(Action.Manage, 'all')).toBeFalsy())

// Support tests
console.log('\n🎧 Support User Tests:')
const supportAbility = defineAbilityFor(supportUser)
test('Support can read property', () => expect(supportAbility.can(Action.Read, 'Property')).toBeTruthy())
test('Support can read user', () => expect(supportAbility.can(Action.Read, 'User')).toBeTruthy())
test('Support cannot create property', () => expect(supportAbility.can(Action.Create, 'Property')).toBeFalsy())
test('Support cannot update property', () => expect(supportAbility.can(Action.Update, 'Property')).toBeFalsy())

// Finance tests
console.log('\n💰 Finance User Tests:')
const financeAbility = defineAbilityFor(financeUser)
test('Finance can read property', () => expect(financeAbility.can(Action.Read, 'Property')).toBeTruthy())
test('Finance can read transaction', () => expect(financeAbility.can(Action.Read, 'Transaction')).toBeTruthy())
test('Finance cannot create property', () => expect(financeAbility.can(Action.Create, 'Property')).toBeFalsy())
test('Finance cannot update property', () => expect(financeAbility.can(Action.Update, 'Property')).toBeFalsy())

// Mortgage operator tests
console.log('\n🏠 Mortgage Operator Tests:')
const mortgageAbility = defineAbilityFor(mortgageUser)
test('Mortgage operator can read property', () => expect(mortgageAbility.can(Action.Read, 'Property')).toBeTruthy())
test('Mortgage operator can update property', () => expect(mortgageAbility.can(Action.Update, 'Property')).toBeTruthy())
test('Mortgage operator can read mortgage', () => expect(mortgageAbility.can(Action.Read, 'Mortgage')).toBeTruthy())
test('Mortgage operator can update mortgage', () => expect(mortgageAbility.can(Action.Update, 'Mortgage')).toBeTruthy())

// Display user tests
console.log('\n👤 User (Display Only) Tests:')
const userAbility = defineAbilityFor(displayUser)
test('Display user can read property', () => expect(userAbility.can(Action.Read, 'Property')).toBeTruthy())
test('Display user cannot create property', () => expect(userAbility.can(Action.Create, 'Property')).toBeFalsy())
test('Display user cannot update property', () => expect(userAbility.can(Action.Update, 'Property')).toBeFalsy())

// Guest tests (should have no access)
console.log('\n🚫 Guest User Tests (Admin Dashboard - No Access):')
const guestAbility = defineAbilityFor(guestUser)
test('Guest cannot read property', () => expect(guestAbility.can(Action.Read, 'Property')).toBeFalsy())
test('Guest cannot create property', () => expect(guestAbility.can(Action.Create, 'Property')).toBeFalsy())
test('Guest cannot update property', () => expect(guestAbility.can(Action.Update, 'Property')).toBeFalsy())
test('Guest cannot manage anything', () => expect(guestAbility.can(Action.Manage, 'all')).toBeFalsy())

// Null user tests
console.log('\n❌ Null User Tests:')
const nullAbility = defineAbilityFor(null)
test('Null user cannot read property', () => expect(nullAbility.can(Action.Read, 'Property')).toBeFalsy())
test('Null user cannot create property', () => expect(nullAbility.can(Action.Create, 'Property')).toBeFalsy())
test('Null user cannot manage anything', () => expect(nullAbility.can(Action.Manage, 'all')).toBeFalsy())

console.log('\n🎉 All unit tests completed!')