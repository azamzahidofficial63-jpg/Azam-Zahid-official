# Security Specification - SmartWPS

## Data Invariants
- A MasterTemplate must belong to a valid Company.
- An Employee must belong to a valid Company and follow its current MasterTemplate structure.
- Only authenticated users belonging to a company can read/write its data.
- The `role` or `companyMembership` is verified via a `users` collection or similar (for this demo, we'll assume ownership via email or a simple membership lookup).

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Spoofing**: Attempt to create a company with someone else's email as owner.
2. **Path Poisoning**: Document IDs with malicious characters.
3. **Template Injection**: Adding extra "Ghost Fields" to a MasterTemplate.
4. **Invalid Type**: Setting "joiningDate" (Date) to a boolean value.
5. **Missing Required**: Creating an employee record without "Employee ID".
6. **Cross-Company Access**: User from Company A trying to read Company B's employees.
7. **Privilege Escalation**: Non-owner trying to modify MasterTemplate fields.
8. **Resource Exhaustion**: Sending a 1MB string in a field name.
9. **Orphaned Record**: Creating an employee for a non-existent company.
10. **Schema Break**: Sending a flat object for Employee data when it should be under `data` key.
11. **Immutable Bypass**: Trying to change `createdAt` on an existing employee.
12. **Status Shortcut**: (If status exists) Skipping mandatory registration steps.

## Test Runner Logic
Verified via `firestore.rules` validation helpers.
