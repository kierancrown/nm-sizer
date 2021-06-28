# nm-sizer

Calculate a total of all node_module folders on your machine.

## Compile

This project is built in Typescript. Once you have installed Typescript you can run the `tsc` command in root directory.

## Usage

You can either run this directly from the project root

```(bash)
node dist
```

You can also install it globally and run it anywhere using `npx`. Install it from the project root

```(bash)
npm i -g .
```

Then use it anywhere with `npx`

```(bash)
npx nm-sizer
```

### CLI Arguments

There are two command line arguments you can pass in

* `--dir` - Change the scope of the search
*Default is the homedir*
* `--output` - Output results to JSON file
*Default is no ouput. If no path is specified default is Desktop*

### Examples

Scan for all node_modules in your Downloads directory and output results to your Desktop

```(bash)
npx nm-sizer --dir ~/Downloads --output
```

Scan for all node_modules in your Home Directory directory and output results to your Documents

```(bash)
npx nm-sizer --output ~/Documents
```

## Contributions

Pull requests are welcome. This is my first public repo so please be kind!
