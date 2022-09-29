//IteratedLearning_Production

PennController.ResetPrefix(null);
PennController.DebugOff();

Sequence("BrowserWarning","Consent", "PreloadVids", "InitiateRecorder", "BackgroundInfo", "Counter", "TrainingInstruct", "TrainingPhase", "TestInstruct", randomize("TestPhase"),  "DebriefQuestions", SendResults(),"EndScreen");

PreloadZip("https://mondo1.dreamhosters.com/IteratedLearning_Production.zip");

PennController.CheckPreloaded(3*60*1000) // wait up to 3 minutes for preload
    .label("PreloadVids");


newTrial("BrowserWarning",
    defaultText
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("REMINDER!")
    .css("font-size", "36px")
    ,
    newText("This experiment <i><b>will not load</b></i> on a tablet or mobile device. Use Chrome or Firefox!")
    ,
    newButton("Proceed", "Proceed")
    .center()
    .print()
    .wait()
    );

newTrial("Consent",
    newImage("Consent","https://mondo1.dreamhosters.com/Gesture_OnlineConsent.jpg")
    .size(1000)
    .print()
    .center()
    ,
    defaultText
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .center()
    .print()
    ,
    newText("CheckConsent", "If you do not wish to participate, <b>return the study</b>. You must check all the boxes below to continue the study:")
    .css("font-size", "24px")
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
    .wait()
    .log()
    ,
    newText("EnterID", "<b>By entering your Prolific ID below</b>, you indicate that you have read the form explaining the research and have been told whom to contact if you have questions about the research. You also agree to participate in the research study described above and will save a copy of this consent form.")
    .print()
    ,
    newTextInput("ProlificID")
    .center()
    .print()
    .log()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait(getScale("Presentations").test.selected(), getScale("FutureResearch").test.selected(), getScale("TV").test.selected())
    .remove()
    ,
    newVar("ParticipantID").global()
    .set(getTextInput("ProlificID"))
)

InitiateRecorder("https://mondo1.dreamhosters.com/AudioRecordings/audiouploads.php",
    "This experiment collects video recordings. Once you grant it access to your recording device, you will be notified of whether you are being recorded by a label at the top of the page.")
.label("InitiateRecorder")

newTrial("BackgroundInfo",
    defaultText
    .css("font-size", "18px")
    .center()
    .print()
    ,
    newText("ListLanguages", "<b>In addition to English</b>, what other languages do you speak? <p> Use the boxes below to tell us which languages you speak and then use the scale to indicate how well you speak each language. If you speak more than four languages, just list the four that you know best.</p>")
    ,
    newCanvas("LanguageProficiency", 600, 300)
    .center()
    .add(0,0,
        newTextInput("Lang1")
        .log()
        .size(200, 24)
        )
    .add("center at 75%", 0,
        newScale("Lang1Scale", 5)
        .center()
        .log()
        .before(newText("Very Basic  "))
        .after(newText("  Native Speaker"))
        )
    .add(0,"middle at 25%",
        newTextInput("Lang2")
        .log()
        .size(200, 24)
        )
    .add("center at 75%", "middle at 25%",
        newScale("Lang2Scale", 5)
        .center()
        .log()
        .before(newText("Very Basic  "))
        .after(newText("  Native Speaker"))
        )
    .add(0,"middle at 50%",
        newTextInput("Lang3")
        .log()
        .size(200, 24)
        )
    .add("center at 75%", "middle at 50%",
        newScale("Lang3Scale", 5)
        .center()
        .log()
        .before(newText("Very Basic  "))
        .after(newText("  Native Speaker"))
        )
    .add(0,"middle at 75%",
        newTextInput("Lang4")
        .log()
        .size(200, 24)
        )
    .add("center at 75%", "middle at 75%",
        newScale("Lang4Scale", 5)
        .center()
        .log()
        .before(newText("Very Basic  "))
        .after(newText("  Native Speaker"))
        )
    .print()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait()
    .remove()
    ,
    getCanvas("LanguageProficiency")
    .remove()
    ,
    getText("ListLanguages")
    .remove()
    ,
    newText("SignExperience", "How much experience have you had with any Sign Language?<p>")
    ,
    newScale("SignScale", 5)
    .center()
    .before(newText("I don't know it at all  "))
    .after(newText("  I'm a native signer"))
    .print()
    .log()
    .wait()
).log("ParticipantID", getVar("ParticipantID"));

SetCounter("Counter", "inc", 1);

newTrial("TrainingInstruct",
    newText("TrainingHeader", "PART 1")
    .center()
    .bold()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("TrainingInstructions", "First, you will see a video of an event. <p>Then, you will watch someone  describe that event using only gestures. Each description will contain 3 different gesture components. </p><p>Watch carefully! You'll have to <b><i>copy all three components of each description</b></i> later!</p>")
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newAudio("TrainingAudio", "TrainingInstruct.mp3")
    .disable()
    .play()
    .wait()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait()
    ,
    getText("TrainingInstructions")
    .remove()
);

Template("TrainingPhase_VNA-VAN_Gen1.csv" , row =>
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
        getButton("Next")
        .print()
        .center()
        .wait()
        .remove()
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
    newText("TestPhaseInstructions", "Your turn! <p><b><i>If it's an event you already saw, produce the same three gesture components</b></i> as in the gesture description video you saw earlier.</p> <p><b><i>If it's a new event, use your own set of three gestures</b></i> to describe the event in the same manner as the gesture description videos.</p><p>Don't use any words or props in these tasks!</p>")
    .center()
    .css("font-size", "24px")
    .print()
    ,
    newAudio("TestAudio", "TestInstruct.mp3")
    .disable()
    .play()
    .wait()
    ,
    newButton("Continue")
    .center()
    .print()
    .wait()
);

Template("TestPhase_VNA-VAN_Gen1.csv", row =>
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
        ,
//Not the coolest timer, but it's very annoying to set up otherwise:
        newTimer("prep-1", 1000)
            .start()
            .wait()
        ,
        clear()
        ,
        newText("Recording-Instruction", "</p> You will have 20 seconds to record your gesture. </p>")
        ,
        newText("Timer-Text", "<p> <h1> 3 </h1> </p>")
        ,
        newTimer("prep-2", 1000)
            .start()
            .wait()
        ,
        getText("Timer-Text")
            .text("<p> <h1> 2 </h1> </p>")
        ,
        newTimer("prep-3", 1000)
            .start()
            .wait()
        ,
        getText("Timer-Text")
            .text("<p> <h1> 1 </h1> </p>")
        ,
        newTimer("prep-4", 1000)
            .start()
            .wait()
        ,
        clear()
        ,
//Recording:
        newMediaRecorder("Gen1_"+row.ChainID+"_"+row.ConditionID+"_"+row.ItemID+"_"+GetURLParameter("id"), "video")
        .print()
        .center()
        .once()
        .record()
        .log()
        ,
        newTimer("secret-real-countdown", 20000)
        .start()
        ,
        newVar("finishTime").set(v=>Date.now()+20000)
        ,
        newText("countDown", "<p> 20s </p>")
        ,
        // This Timer element will execute a callback after 1s
        newTimer("updateCountdown",1000)
            .callback(
                newVar("difference")
                    .set(getVar("finishTime")).set(v=>v-Date.now())
                    .test.is(v=>v>0) // Positive value means current time still below finish time
                    .success(
                getVar("difference")
                    .set(v=>Math.round((v/1000)%60)+"s")
                ,
                getText("countDown").text(getVar("difference")) // Update the Text element
                ,
                // Relaunch the timer to update again in 1s
                getTimer("updateCountdown").start()
             ))
            .start()
        ,
        newButton("input-done", "Press here to finish recording.")
            .center()
            .print()
            .callback(getMediaRecorder("Gen1_"+row.ChainID+"_"+row.ConditionID+"_"+row.ItemID+"_"+GetURLParameter("id")).stop())
            .callback(getTimer("secret-real-countdown") .stop())
        ,
        getTimer("secret-real-countdown")
            .wait()
        ,
        getMediaRecorder("Gen1_"+row.ChainID+"_"+row.ConditionID+"_"+row.ItemID+"_"+GetURLParameter("id"))
            .stop()
            .disable()
    )
    .log("ParticipantID", getVar("ParticipantID"))
    .log("ItemNumb", row.ItemNumb)
    .log("ChainID", row.ChainID)
    .log("ItemID", row.ItemID)
    .log("ConditionID", row.ConditionID)
    .log("AdjType", row.AdjType)
    .log("ContrastType", row.ContrastType)
    .log("DominantOrder", row.DominantOrder)
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

();

newTrial("EndScreen",
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=355B7C59'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    newButton("void")
        .wait()
).setOption("hideProgressBar",true);
