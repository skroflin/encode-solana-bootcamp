fn main() {
    println!("Hello, welcome!");

    let fizz_buzz_count = fizz_buzz();
    println!("Total number of 'fizz buzz' occurrances is: {}", fizz_buzz_count);
}

fn fizz_buzz() -> u32{
    let mut fizz_buzz_count = 0;
    for i in 1..=300{
        if i % 3 == 0 && i % 5 == 0{
            println!("fizz buzz");
            fizz_buzz_count += 1;
        }else if i % 3 == 0{
            println!("fizz");
        }else if i % 5 == 0{
            println!("buzz");
        }else{
            println!("{}", i);
        }
    }

    fizz_buzz_count
}