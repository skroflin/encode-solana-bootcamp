// primitive_types4.rs
// Get a slice out of Array a where the ??? is so that the test passes.
// Execute `rustlings hint primitive_types4` for hints!!

#[test]
fn slice_out_of_array() {
    // let a = [1, 2, 3, 4, 5]; // - Testing
    
    let a = [1, 2, 3, 4, 5, 6];

    let nice_slice = &a[1..5];

    // assert_eq!([2, 3, 4], nice_slice)
    assert_eq!([2, 3, 4, 5], nice_slice) // - Testing

    // println!("{}", nice_slice); - Testing
}
