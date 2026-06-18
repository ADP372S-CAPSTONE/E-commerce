# E-commerce

## Entities

* **UserManagement**: System actors separating client shoppers from administrators.
* **ProductCatalog**: Hardware parts and ready-to-use desktop system boundaries.
* **Order**: Core checkout aggregate roots mapping individual transaction line items.
* **Payment**: Multi-channel electronic financial logging and processing networks.
* **Delivery**: Logistics tracking, airway bills, and geographic transport milestones.
* **Feedback**: Customer-submitted product reviews and delivery service rating matrices.

## Group Members

* **Leader**: TIYANI NGWANA 231266731 - Payment Entity
* **Member 2**: ABULELE NTWANAMBI 218276400 - Feedback Entity
* **Member 3**: NOMHLE NJENGELE 216227488 - ProductCatalog Entity
* **Member 4**: OWENKOSI NXASANA 230240887 - UserManagement Entity
* **Member 5**: SINAZO NTSIMBI 222765208 - Delivery Entity
* **Member 6**: SINETHEMBA NYIMBINYA 220085870 - Order Entity

## Contributing Guidelines

### Pull Request Process

1. Create a development branch named explicitly with your student number.
2. Implement your vertical layer feature completely alongside corresponding Test-Driven Development (TDD) fixtures.
3. Execute localized compilation to ensure all engineering tests pass successfully.
4. Update class-level documentation if additional properties are added to standard models.
5. Open a formal Pull Request (PR) directing your branch into the `main` trunk.
6. Request an architectural review validation from the team lead before merging.
7. Address any code quality review comments promptly.
8. Merge securely into `main` after receiving official approval.

### Code Review Checklist

* [ ] **Follows Builder Pattern**: Completely hand-coded without any external framework extensions.
* [ ] **Strict Immutability**: Contains public accessors but **zero setter methods**.
* [ ] **Validation Failure Logic**: Intentionally returns `null` instead of throwing execution exceptions when invariants fail.
* [ ] **Includes TDD Tests**: Validates functional parameters using clean JUnit 5 text runners.
* [ ] **Proper Package Placement**: Strictly fits root package domains (`domain`, `factory`, `repository`, `service`, `controller`).
* [ ] **Author Comments Included**: Structured file header metadata block visible at the absolute top of the source code file.
* [ ] **No Merge Conflicts**: Branch line matches cleanly with upstream components.
* [ ] **All Tests Passing**: Local builds pass integration cycles flawlessly.

## UML Diagram
