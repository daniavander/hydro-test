import { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';

class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
        //console.log(`>>> Suite title: ${suite.title} <<<`)
    }
    onStepBegin?(test: TestCase, result: TestResult, step: TestStep) {
        console.log(`STEP ${step.title}`);

        if (step.category === "test.step") {
            console.log(`Starting step title ${step.title}`);
        }
    }
    /*onStepEnd?(test: TestCase, result: TestResult, step: TestStep) {
        if (step.category === "test.step") {
            console.log(`Result of Step ${step.title} with status ${result.status}`);
        }
        if (step.error) {
            console.log(step.error.message);
        }
        
    }
    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ`)
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title} - ${result.status}`);
        if (result.error) {
            console.log("Error happened -> ")
            //console.log(result.errors)
        }
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    }

    onEnd(result: FullResult) {
        console.log(`Finished the Suite: ${result.status}`)
    }*/
}
export default MyReporter;