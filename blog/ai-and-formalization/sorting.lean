-- Companion to "What Happens When Formalization Becomes Cheap?"
-- Checked with Lean 4.27.0. Uses only Lean's standard library.
import Std

-- For every input, the output is sorted and preserves all elements.
def SortsCorrectly
    (sort : List Nat → List Nat) : Prop :=
  ∀ xs, (sort xs).Pairwise (· ≤ ·) ∧
    (sort xs).Perm xs

-- Use the library's merge sort implementation.
def sort (xs : List Nat) : List Nat :=
  xs.mergeSort

-- Combine the library's ordering and permutation proofs.
theorem sort_correct : SortsCorrectly sort := by
  intro xs
  constructor
  · simpa [sort] using
      List.pairwise_mergeSort
        (le := fun a b : Nat => a ≤ b)
        (by
          intros
          simp_all only [decide_eq_true_eq]
          omega)
        (by
          intros
          simp only [Bool.or_eq_true, decide_eq_true_eq]
          omega) xs
  · exact List.mergeSort_perm xs _

#eval sort [3, 1, 2, 1]  -- [1, 1, 2, 3]
