import React from 'react'
import styles from './sprout.module.css'
import highlighter from '../../sprout/highlighter'
import Link from 'next/link'

export default function Sprout() {
    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <h1 className={styles.title}>
                    Sprout
                    <br />
                    Docs
                </h1>
                <Tab>Introduction</Tab>
                <Tab>Math Operations</Tab>
                <Tab>Variables</Tab>
                <Tab>Functions</Tab>
                <Tab>Function Arguments</Tab>
                <Tab>If Statements</Tab>
                <Tab>Else Statements</Tab>
            </div>
            <div className={styles.sideBarPlaceHolder}></div>
            <div className={styles.page}>
                <Heading>Introduction</Heading>
                <Text>
                    Welcome to Sprout, a programming language that is completely
                    readable by any english speaker. Let's start with a{' '}
                    <b>Hello World</b> example (hello world is the first program
                    any programmer writes):
                </Text>
                <Code>say "hello world".</Code>
                <Text>
                    As you have probably guessed, this just makes the program
                    say "hello world." The <C>say</C> keyword makes the program
                    say whatever is after it.
                </Text>
                <Text>
                    It's important to note that all text needs to be put in{' '}
                    <C>""</C>, and all numbers can just be stated normally like
                    this: <C>420</C>.
                </Text>
                <Text>
                    There's one more data type that can be used besides text and
                    numbers which is called a boolean. A boolean is just{' '}
                    <C>true</C> or <C>false</C>.
                </Text>
                <Text>Here are some examples:</Text>
                <Code>{'say "bruh".\nsay 69.\nsay true.'}</Code>
                <Heading>Math Operations</Heading>
                <Text>Here's an example of how to use a math operator:</Text>
                <Code>say 2 plus 2.</Code>
                <Text>
                    This would make the program say 4. Here's a list of
                    examples, and you can test out exactly how each math
                    operator works:
                </Text>
                <Code>
                    {
                        'say 2 minus 2.\nsay 3 times 2.\nsay 4 divided by 2.\nsay true and false.\nsay true or false.\nsay 4 is less than 5.\nsay 4 is greater than 5.\nsay 2 is equal to 2.'
                    }
                </Code>
                <Heading>Variables</Heading>
                <Text>
                    You can make your own keywords that equals to something
                    else. This may sound confusing but let's see an example:
                </Text>
                <Code>{'let message be "hello".\nsay message.'}</Code>
                <Text>
                    You make <C>message</C> mean the same thing as{' '}
                    <C>"hello"</C> which you can use later in your code. So the
                    line <C>say message</C> makes the program say "hello".
                </Text>
                <Text>
                    You can put anything you want in it, including math
                    operations. Here are a few examples:
                </Text>
                <Code>
                    {
                        'let one be 1.\nlet something be "ur mom " plus "bruh".\nlet thisRaNdomBoolean be true.'
                    }
                </Code>
                <Heading>Functions</Heading>
                <Text>
                    A function is just a chunk of code that can be assigned a
                    name, and then used later. Here is an example:
                </Text>
                <Code>
                    {
                        'let thisFunction do:\n  say "bruh".\n  say "chicken".\n  stop.'
                    }
                </Code>
                <Text>
                    The stop keyword is used to let the programming language
                    know when the code block for the function shoud end. To run
                    the block of code, you can do this:
                </Text>
                <Code>{'run thisFunction.'}</Code>
                <Text>
                    And you can run it as many times as you want to in your code
                    like this:
                </Text>
                <Code>
                    {
                        'run thisFunction.\nrun thisFunction.\nsay "tomato".\nrun thisFunction.'
                    }
                </Code>
                <Text>
                    You can even call the function from inside the function,
                    which is called recursion:
                </Text>
                <Code>
                    {
                        'let thisFunction do:\n  say "bruh".\n  run thisFunction.\n  stop.\n\nrun thisFunction.'
                    }
                </Code>
                <Heading>Function Arguments</Heading>
                <Text>
                    This is a slightly more advanced topic. Arguments are
                    essentially just variables that you can put in the function
                    when you run it. To demonstrate, let's look at this example:
                </Text>
                <Code>
                    {
                        'let messenger do:\n  say message.\n  stop.\n\nrun messenger with "bruh" as message.'
                    }
                </Code>
                <Text>
                    The first 3 lines just create the function. Notice how the
                    2nd line uses the variable <C>message</C> even though we
                    never made it. This is because when we run the function, we
                    create it. <C>message</C> stops existing once the function
                    stops running.
                </Text>
                <Text>
                    You can also run a function with more than one argument:
                </Text>
                <Code>
                    {'run messenger with "bruh" as message, "bob" as person.'}
                </Code>
                <Heading>If Statements</Heading>
                <Text>
                    An if statement is a block of code than only runs if some
                    condition is <C>true</C>. For example:
                </Text>
                <Code>
                    {
                        'let thisGuyIsALoser be true.\n\nif thisGuyIsALoser do:\n  say "haha gottem".\n  stop.'
                    }
                </Code>
                <Text>Here are a few other examples</Text>
                <Code>
                    {
                        'let thisPersonIsCool be true.\nlet thisOtherPersonIsCool be true.\n\nif thisPersonIsCool and thisOtherPersonIsCool do:\n  say "compatible".\n  stop.'
                    }
                </Code>
                <Code>
                    {
                        'if 4 is less than 5 do:\n  say "ok thank god I can count".\n  stop.'
                    }
                </Code>
                <Heading>Else Statements</Heading>
                <Text>
                    Else statements are similar to if statements, except else
                    statements run if a condition is true and if a previous if
                    statement's condition is false. For example:
                </Text>
                <Code>
                    {
                        'if false do:\n  say "this code block will never run".\n  stop.\n\notherwise if true do:\n  say "this code block will always run."\n  stop.'
                    }
                </Code>
            </div>
        </div>
    )
}

function Tab({ children }) {
    const link = ('#' + children.toLowerCase()).split(' ').join('')

    return (
        <Link href={link} passHref>
            <a className={styles.tab}>{children}</a>
        </Link>
    )
}

function Heading({ children = '' }) {
    const id = children.toLowerCase().split(' ').join('')
    return (
        <h2 className={styles.heading} {...{ id }}>
            {children}
        </h2>
    )
}

function Text({ children }) {
    return <p className={styles.text}>{children}</p>
}

function Code({ children }) {
    return <div className={styles.code}>{highlighter(children)}</div>
}

function C({ children }) {
    return <font className={styles.c}>{highlighter(children)}</font>
}
