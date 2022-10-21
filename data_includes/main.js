//IteratedLearning_Production


PennController.ResetPrefix(null);
PennController.DebugOff();

Sequence("PreloadVids", "Consent", "Counter", "TrainingInstruct", "TrainingPhase", "TestInstruct", randomize("TestPhase"),  "DebriefQuestions", SendResults(),"EndScreen");

PreloadZip("https://mondo1.dreamhosters.com/IteratedLearning_Production.zip");

PennController.CheckPreloaded(3*60*1000) // wait up to 3 minutes for preload
    .label("PreloadVids");

newTrial("Consent",
        defaultText
        .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
        .css("font-size", "18px")
        .center()
        .print()
        ,
        newText("InternalUseOnly", "<b>For Experimenter Use Only:</b>Please Input SubjNumber using the following format: Subj##.")
        .css("font-size", "24px")
        .color("red")
        ,
        newTextInput("ParticipantID")
        .center()
        .print()
        .wait()
        .remove()
        .log()
        ,
        clear()
        ,
        newText("CheckConsent", "Verify boxes below to indicate participant consent for the following:")
        .css("font-size", "24px")
        .color("red")
        ,
        newScale("Participation", "I agree to allow the researchers to show images or videos of me to in published articles or in public presentations.")
        .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
        .css("font-size", "18px")
        .checkbox()
        .vertical()
        .print()
        .log()
        ,
        newScale("Presentations", "I agree to allow the researchers to show images or videos of me to in published articles or in public presentations.")
        .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
        .css("font-size", "18px")
        .checkbox()
        .vertical()
        .print()
        .log()
        ,
        newScale("FutureResearch", "I agree to allow the researchers to show images or videos of me to other participants in similar future research.")
        .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
        .css("font-size", "18px")
        .checkbox()
        .vertical()
        .print()
        .log()
        ,
        newScale("TV", "I agree to allow the researchers to show images or videos of me on the internet and/or on television for educational or research purposes.")
        .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
        .css("font-size", "18px")
        .checkbox()
        .vertical()
        .print()
        .log()
        ,
        newButton("Continue")
        .center()
        .print()
        .wait()
        ,
        newVar("ParticipantID").global()
        .set(getTextInput("ParticipantID"))
    )

SetCounter("Counter", "inc", 1);

newTrial("TrainingInstruct",
    newText("TrainingHeader", "PART 1")
    .center()
    .bold()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("TrainingInstructions", "You are going to learn a gesture language.<p>First, you will see a video of an event. Then, you will see someone describing that event using exactly three different gestures. Watch each description carefully, because you’ll have to communicate using these exact same gestures later.</p><p>To help you learn the three different gestures in each video, you will copy each sequence immediately after each training video.</p>")
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait()
    .remove()
    ,
    getText("TrainingInstructions")
    .remove()

);

Template( "TrainingPhase_NAV-ANV_Gen1.csv" , row =>
    newTrial("TrainingPhase",
        newText("EventVideo", "Event Video")
        .center()
        .bold()
        .css("font-size", "24px")
        .cssContainer({"margin-bottom":"1em"})
        .print()
        ,
        newVideo("ActionVid", row.ActionVidFilename)
        .size("60vw", "60vh")
        .disable(.01)
        .center("center at 50%", "middle at 50%")
        .print()
        ,
        newTimer(2500) //delay video start by 2500ms
        .start()
        .wait()
        ,
        getVideo("ActionVid")
        .play()
        .wait()
        ,
        newButton("Next", "Next")
        .print()
        .center()
        .wait()
        .remove()
        ,
        clear()
        ,
        newText("GestureVideo", "Gesture Description")
        .center()
        .bold()
        .css("font-size", "24px")
        .cssContainer({"margin-bottom":"1em"})
        .print()
        ,
        newVideo("GestureVid", row.GestureVidFilename)
        .size("60vw", "60vh")
        .disable(.01)
        .center("center at 50%", "middle at 50%")
        .print()
        .play()
        .wait()
        ,
        clear()
        ,
        newText("Recording-Instruction", "Copy the sequence that you just saw!")
        .center()
        .bold()
        .css("font-size", "24px")
        .cssContainer({"margin-bottom":"1em"})
        .print()
        )
    .log("ParticipantID", getVar("ParticipantID"))
    .log("ItemNumb", row.ItemNumb)
    .log("GenID", row.GenID)
    .log("ChainID", row.ChainID)
    .log("ItemID", row.ItemID)
    .log("ConditionID", row.ConditionID)
    .log("TrainingOrder", row.TrainingOrder)
    .log("AdjType", row.AdjType)
    .log("ContrastType", row.ContrastType)
    .log("DominantOrder", row.DominantOrder)
    .log("NonTargetLoc", row.NonTargetLoc)
    .log("HoldOut", row.HoldOut)
);

newTrial("TestInstruct",
    newText("TestHeader", "PART 2")
    .center()
    .bold()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("TestPhaseInstructions", "<p>Now, imagine that someone else is also seeing a set of event videos and they have to decide whether they’re seeing the same exact events as you did.</p><p>If it's an event you saw during training, use the exact same gesture sequence that you learned earlier to describe the event.</p> <p>If you see a new event, create a sequence containing three new gestures to describe the event.</p><p>You are not allowed to use any words or props.</p> <p><b>IMPORTANT: All of your sequences should contain exactly three gestures !</b></p>")
    .center()
    .css("font-size", "24px")
    .print()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait()
);

Template("TestPhase_NAV-ANV_Gen1.csv", row =>
    newTrial("TestPhase",
        defaultText
            .bold()
            .center()
            .css("font-size", "24px")
            .cssContainer({"margin-bottom":"1em"})
            .print()
        ,
        newVideo("video", row.ActionVidFilename)
            .size("60vw", "60vh")
            .center()
            .print()
            .disable(0)
            .log()
        ,
        newTimer("pause", 1000)
            .start()
            .wait()
        ,
        getVideo("video")
            .play()
            .wait()
            .once()
        ,
        newButton("input-done", "Continue to next video")
            .center()
            .print()
            .wait()
        ,
        clear()
    )
    .log("ParticipantID", getVar("ParticipantID"))
    .log("ItemNumb", row.ItemNumb)
    .log("GenID", row.GenID)
    .log("ChainID", row.ChainID)
    .log("ItemID", row.ItemID)
    .log("ConditionID", row.ConditionID)
    .log("TrainingOrder", row.TrainingOrder)
    .log("AdjType", row.AdjType)
    .log("ContrastType", row.ContrastType)
    .log("DominantOrder", row.DominantOrder)
    .log("NonTargetLoc", row.NonTargetLoc)
    .log("HoldOut", row.HoldOut)
);

newTrial("DebriefQuestions",
    defaultText
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("RateDifficulty", "How easy or difficult was this experiment to you?")
    ,
    newScale("Difficulty", 7)
        .before(newText("Extremely Easy  "))
        .after(newText("  Extremely Hard"))
        .center()
        .print()
        .log()
        .cssContainer({"margin-bottom":"1em"})
    ,
    newText("Strategies", "If you had any strategies for doing the experiment, let us know:")
    ,
    newTextInput("StrategyBox")
        .lines(5)
        .center()
        .print()
        .log()
        .cssContainer({"margin-bottom":"1em"})
    ,
    newText("Comments", "Feel free to enter any comments in the box below:")
    ,
    newTextInput("CommentBox")
        .lines(25)
        .center()
        .print()
        .log()
        .cssContainer({"margin-bottom":"1em"})
    ,
    newButton("End Experiment")
        .center()
        .print()
        .wait()
    ).log("ParticipantID", getVar("ParticipantID"));
