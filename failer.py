status=$(isFailed test-results -type f | wc -l)
echo $status
if [ "$status" -eq "0" ]; then echo "Passed"; exit 0; else exit 1; fi