class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (!this.creator) {
      return 0;
    } else {
      return this.creator.numberOfVampiresFromOriginal + 1;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let result = this.offspring.length;

    if (this.offspring.length !== 0)
      result += this.offspring.reduce((sum, child) => sum + child.totalDescendents, 0);

    return result;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let result = this.yearConverted > 1980 ? [this] : [];
    
    result = this.offspring.reduce(
      (millennials, vampire) => {
        millennials.concat(vampire.allMillennialVampires);
      },
      result
    );

    return result;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let myPath = this.pathToRoot;

    for (let ancestor of vampire.pathToRoot) {
      if (myPath.includes(ancestor)) {
        return ancestor;
      }
    }
  }

  get pathToRoot() {
    return this.creator ? [this].concat(this.creator.pathToRoot) : [this];
  }
}

module.exports = Vampire;

