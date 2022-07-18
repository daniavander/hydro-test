import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';



declare var circleNum: 0;

class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
        //console.log(`Starting the run with ${suite.allTests().length} tests`);
        console.log(`>>> Suite title: ${suite.title} <<<`)
    }
    onStepBegin?(test: TestCase, result: TestResult, step: TestStep) {
        console.log(`STEP ${step.title}`);

        if (step.category === "test.step") {
            console.log(`Starting step title ${step.title}`);
        }
    }
    onStepEnd?(test: TestCase, result: TestResult, step: TestStep) {
        let isFailed: boolean = false;
        if (step.category === "test.step") {
            console.log(`Result of Step ${step.title} with status ${result.status}`);
        }
        if (step.error) {
            isFailed = true
            console.log(step.error.message);
            console.log(isFailed);
        }
    }
    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {


        //console.log("That is: " + circleNum + " circle");
        if (result.status == 'passed') {
            console.log(">>Finished PASS :)")
        }else{
            console.log(">>Finished FAILED :(")
        }
        if (result.error) {
            console.log("Error happened -> ")
            console.log(result.errors)
        }
        //circleNum ++
    }

    onEnd(result: FullResult) {
        if (result.status == 'passed') {
            console.log("SUITE PASS :)")
        }else{
            console.log("SUITE FAILED :(")
        }
    }
}
export default MyReporter;