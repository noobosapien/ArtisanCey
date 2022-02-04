describe('Closes the top shipping message bar', () => {
  it('First', () => {
    cy.visit('/');

    cy.get('button.MuiIconButton-sizeSmall').click();
  });
});
